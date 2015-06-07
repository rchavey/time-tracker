package net.chavey.timetracker;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class EventController {



    @RequestMapping(value="/total-event-seconds")
    public ResponseEntity<?> eventTimeSum() {

        Map<String, Object> body = new HashMap<>();
        body.put("totalEventSeconds", 1523L);
        return ResponseEntity.ok(body);
    }

}
