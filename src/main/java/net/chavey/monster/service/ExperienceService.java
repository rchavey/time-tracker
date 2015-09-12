package net.chavey.monster.service;

import net.chavey.monster.domain.DeadMonster;
import net.chavey.monster.domain.Experience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    NamedParameterJdbcOperations jdbcOperations;

    public List<Experience> baseXp(Integer hitDice, Integer modifier) {

        String query = "select e.* from hit_dice_range hdr" +
                " join experience e" +
                "   on hdr.id = e.hit_dice_range_id" +
                " where (hdr.min_hit_die < :hitDice and :hitDice < hdr.max_hit_die)" +
                "   or (:hitDice = hdr.min_hit_die and :mod >= hdr.min_hit_die_modifier and (:hitDice < hdr.max_hit_die or (:hitDice = hdr.max_hit_die and :mod <= hdr.max_hit_die_modifier)))" +
                "   or (:hitDice = hdr.max_hit_die and :mod <= hdr.max_hit_die_modifier and (:hitDice > hdr.min_hit_die or (:hitDice = hdr.min_hit_die and :mod >= hdr.min_hit_die_modifier)))";

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("hitDice", hitDice)
                .addValue("mod", modifier);

        return jdbcOperations.query(query, params, BeanPropertyRowMapper.newInstance(Experience.class));
    }

    public Integer calculateEncounterXp(Long encounterId) {

        String sql = "select em.max_hit_points, mt.hit_dice, mt.hit_die_modifier, mt.special_ability_count, mt.exceptional_ability_count " +
                "from encounter e " +
                "join encounter_monster_type emt " +
                "  on e.id = emt.encounter_id " +
                "join encounter_monster em " +
                "  on e.id = em.encounter_id " +
                "  and emt.monster_type_id = em.monster_type_id " +
                "join monster_type mt " +
                "  on emt.monster_type_id = mt.id " +
                "where em.current_hit_points = 0" +
                "  and e.id = :encounterId";

        MapSqlParameterSource param = new MapSqlParameterSource("encounterId", encounterId);
        List<DeadMonster> deadMonsters = jdbcOperations.query(sql, param, BeanPropertyRowMapper.newInstance(DeadMonster.class));

        int totalXp = 0;
        for (DeadMonster deadMonster : deadMonsters) {
            totalXp += calculateXp(deadMonster);
        }
        return totalXp;
    }

    private int calculateXp(DeadMonster deadMonster) {

        Experience xpData = baseXp(deadMonster.getHitDice(), deadMonster.getHitDieModifier()).get(0);
        int hitPoints = deadMonster.getMaxHitPoints();
        int baseXp = xpData.getBasicXp();
        int hitPointXp = xpData.getHitPointXp();
        int specialAbilityCount = deadMonster.getSpecialAbilityCount();
        int specialAbilityXp = xpData.getSpecialAbilityXp();
        int exceptionalAbilityCount = deadMonster.getExceptionalAbilityCount();
        int exceptionalAbilityXp = xpData.getExceptionalAbilityXp();
        return baseXp
                + (hitPoints * hitPointXp)
                + (specialAbilityCount * specialAbilityXp)
                + (exceptionalAbilityCount * exceptionalAbilityXp);
    }

}
