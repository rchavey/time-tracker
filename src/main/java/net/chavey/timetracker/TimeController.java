package net.chavey.timetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class TimeController {

    @Autowired
    private TimeRepository timeRepository;

    @RequestMapping(value="/total-event-seconds")
    public ResponseEntity<?> eventTimeSum() {

        Long elapsedSeconds = timeRepository.getTotalElapsedSeconds();
        Map<String, Long> body = Collections.singletonMap("totalEventSeconds", elapsedSeconds);
        return ResponseEntity.ok(body);
    }

}
