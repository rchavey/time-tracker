package net.chavey.monster.domain;

/**
* Created by awittig on 3/27/15.
*/
public class Experience {

    Integer basicXp;
    Integer hitPointXp;
    Integer specialAbilityXp;
    Integer exceptionalAbilityXp;

    public Integer getBasicXp() {
        return basicXp;
    }

    public void setBasicXp(Integer basicXp) {
        this.basicXp = basicXp;
    }

    public Integer getHitPointXp() {
        return hitPointXp;
    }

    public void setHitPointXp(Integer hitPointXp) {
        this.hitPointXp = hitPointXp;
    }

    public Integer getSpecialAbilityXp() {
        return specialAbilityXp;
    }

    public void setSpecialAbilityXp(Integer specialAbilityXp) {
        this.specialAbilityXp = specialAbilityXp;
    }

    public Integer getExceptionalAbilityXp() {
        return exceptionalAbilityXp;
    }

    public void setExceptionalAbilityXp(Integer exceptionalAbilityXp) {
        this.exceptionalAbilityXp = exceptionalAbilityXp;
    }
}
