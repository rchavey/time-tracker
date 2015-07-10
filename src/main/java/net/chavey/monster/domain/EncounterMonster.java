package net.chavey.monster.domain;

public class EncounterMonster {

    private Integer currentHitPoints;
    private Integer maxHitPoints;

    public Integer getCurrentHitPoints() {

        return currentHitPoints;
    }

    public void setCurrentHitPoints(Integer currentHitPoints) {

        this.currentHitPoints = currentHitPoints;
    }

    public Integer getMaxHitPoints() {

        return maxHitPoints;
    }

    public void setMaxHitPoints(Integer maxHitPoints) {

        this.maxHitPoints = maxHitPoints;
    }
}
