package net.chavey.monster.domain;

/**
* Created by awittig on 3/27/15.
*/
public class DeadMonster {

    Integer hitPoints;
    Integer hitDice;
    Integer hitDieModifier;
    Integer specialAbilityCount;
    Integer exceptionalAbilityCount;

    public Integer getHitPoints() {
        return hitPoints;
    }

    public void setHitPoints(Integer hitPoints) {
        this.hitPoints = hitPoints;
    }

    public Integer getHitDice() {
        return hitDice;
    }

    public void setHitDice(Integer hitDice) {
        this.hitDice = hitDice;
    }

    public Integer getHitDieModifier() {
        return hitDieModifier;
    }

    public void setHitDieModifier(Integer hitDieModifier) {
        this.hitDieModifier = hitDieModifier;
    }

    public Integer getSpecialAbilityCount() {
        return specialAbilityCount;
    }

    public void setSpecialAbilityCount(Integer specialAbilityCount) {
        this.specialAbilityCount = specialAbilityCount;
    }

    public Integer getExceptionalAbilityCount() {
        return exceptionalAbilityCount;
    }

    public void setExceptionalAbilityCount(Integer exceptionalAbilityCount) {
        this.exceptionalAbilityCount = exceptionalAbilityCount;
    }
}
