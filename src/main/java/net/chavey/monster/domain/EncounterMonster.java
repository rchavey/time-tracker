package net.chavey.monster.domain;

public class EncounterMonster {

    private Integer hitPoints;
    private boolean dead;

    public Integer getHitPoints() {
        return hitPoints;
    }

    public void setHitPoints(Integer hitPoints) {
        this.hitPoints = hitPoints;
    }

    public Boolean isDead() {
        return dead;
    }

    public void setDead(Boolean dead) {
        this.dead = dead != null && dead;
    }
}
