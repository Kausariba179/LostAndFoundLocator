package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosys.lostFoundLocatorApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class MatchItemController {

    @Autowired
    private MatchItemService service;

    // Save Match
    @PostMapping("/match")
    public void saveMatch(@RequestBody MatchItemDTO dto) {

        service.saveMatchItem(dto);
    }

    // Get All Matches
    @GetMapping("/match")
    public List<MatchItem> getAllMatches() {

        return service.getAllMatches();
    }

}