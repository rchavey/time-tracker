package net.chavey.monster.domain;

public class DeadMonster {

    Integer maxHitPoints;
    Integer hitDice;
    Integer hitDieModifier;
    Integer specialAbilityCount;
    Integer exceptionalAbilityCount;

    public Integer getMaxHitPoints() {
        return maxHitPoints;
    }

    public void setMaxHitPoints(Integer maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
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
