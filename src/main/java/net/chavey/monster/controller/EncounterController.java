package net.chavey.monster.controller;

import net.chavey.monster.domain.Encounter;
import net.chavey.monster.domain.EncounterMonsterType;
import net.chavey.monster.service.EncounterRepository;
import net.chavey.monster.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EncounterController {

    @Autowired
    private EncounterRepository encounterRepository;

    @Autowired
    private ExperienceService experienceService;

    @RequestMapping(value = "controller/encounters", method = RequestMethod.GET)
    public ResponseEntity<List<Encounter>> getAll() {

        List<Encounter> encounters = encounterRepository.getAll();
        return ResponseEntity.ok(encounters);
    }

    @RequestMapping(value = "controller/encounter/{encounterId}", method=RequestMethod.GET)
    public ResponseEntity<Encounter> getEncounter(@PathVariable Integer encounterId) {

        return ResponseEntity.ok(encounterRepository.getEncounter(encounterId));
    }

    @RequestMapping(value = "controller/encounter/{encounterId}", method=RequestMethod.DELETE)
    public String delete(@PathVariable Integer encounterId) {

        encounterRepository.delete(encounterId);
        return "success";
    }

    @RequestMapping(value = "/controller/encounter", method = RequestMethod.POST)
    public ResponseEntity<Number> post(@RequestBody Encounter encounter) {

        return ResponseEntity.ok(encounterRepository.create(encounter));
    }

    @RequestMapping(value="/controller/encounter/{encounterId}", method=RequestMethod.POST)
    public ResponseEntity<Number> post(@RequestBody Encounter encounter, @PathVariable Integer encounterId) {

        encounterRepository.update(encounter, encounterId);
        return ResponseEntity.ok(encounterId);
    }

    @RequestMapping(value="/controller/encounter/{encounterId}/monster-type", method=RequestMethod.POST)
    public String post(@RequestBody(required = false) EncounterMonsterType encounterMonsterType, @PathVariable Integer encounterId) {

        encounterRepository.create(encounterMonsterType, encounterId);
        System.out.println("post");
        return "saved monster types";
    }

    @RequestMapping(value="/controller/encounter/{encounterId}/xp", method=RequestMethod.GET)
    public ResponseEntity<Integer> calculateEncounterXp(@PathVariable Long encounterId) {

        Integer xp = experienceService.calculateEncounterXp(encounterId);
        return ResponseEntity.ok(xp);
    }
}
