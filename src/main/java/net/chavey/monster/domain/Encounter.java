package net.chavey.monster.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class Encounter {

    private Integer id;
    private String name;
    private List<EncounterMonsterType> encounterMonsterTypes = new ArrayList<>();

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {

        this.id = id;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public List<EncounterMonsterType> getEncounterMonsterTypes() {

        return encounterMonsterTypes;
    }

    public void addEncounterMonsterTypes(EncounterMonsterType...encounterMonsterTypes) {

        addEncounterMonsterTypes(Arrays.asList(encounterMonsterTypes));
    }

    public void addEncounterMonsterTypes(Collection<EncounterMonsterType> encounterMonsterTypes) {

        this.encounterMonsterTypes.addAll(encounterMonsterTypes);
    }
}
