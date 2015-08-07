package net.chavey.monster.controller;

import com.google.gson.Gson;
import net.chavey.monster.domain.Experience;
import net.chavey.monster.domain.MonsterType;
import net.chavey.monster.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("controller")
public class MonsterController {

    @Autowired
    private NamedParameterJdbcOperations jdbcOperations;

    @Autowired
    ExperienceService experienceService;

    @RequestMapping(value="monsters", method=RequestMethod.GET)
    public List<MonsterType> monsters() {

        return jdbcOperations.query("select * from monster_type order by name", BeanPropertyRowMapper.newInstance(MonsterType.class));
    }

    @RequestMapping(value="monster/{id}", method=RequestMethod.GET)
    public String monsters(@PathVariable Long id) {

        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("id", id);
        List<Map<String, Object>> monsters = jdbcOperations.queryForList("select * from monster_type where id = :id", paramMap);
        Gson gson = new Gson();
        return gson.toJson(monsters);
    }

    @RequestMapping(value = "monster", method = RequestMethod.POST)
    public String saveMonster(@RequestParam Map<String, String> params) {

        try {
            System.out.println(params);
            params.put("weaponAttack", params.containsKey("weaponAttack") ? "1" : "0");
            jdbcOperations.update("insert into monster_type" +
                            "(name, attack_count, weapon_attack_flag, damage_per_attack, hit_dice, hit_die_modifier, armor_class, size, movement, treasure," +
                            " special_ability_count, special_abilities, exceptional_ability_count, exceptional_abilities, intelligence, alignment, rarity, notes)" +
                            "values (:name, :numAttacks, :weaponAttack, :damagePerAttack, :HD, :hitModifier, :AC, :size, :movement, :treasure," +
                            " :numSpecialAbilities, :specialAbilities, :numExceptionalAbilities, :exceptionalAbilities, :intelligence, :alignment, :rarity, :notes)",
                    params);
            return params.get("name") + " saved successfully";
        } catch (DataAccessException e) {
            return e.getMessage();
        }
    }

    @RequestMapping(value = "monster", method = RequestMethod.GET)
    public String getMonster() {

        return "monster";
    }

    @RequestMapping(value = "base-xp", method = RequestMethod.GET)
    public String baseXp(@RequestParam Integer hitDice, @RequestParam Integer modifier) {

        List<Experience> experience = experienceService.baseXp(hitDice, modifier);
        return new Gson().toJson(experience);
    }
}
