package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.service.LostItemService;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")

public class LostItemController {
	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private LostItemService lostService;
	
	@PostMapping("/lost")
	public void saveLostItem(@RequestBody LostItem lostItem) {
		// Insert statement for saving the lost item as all the jsx object will go to java as json format
		//
		lostItemDao.saveLostItem(lostItem);
		//repository.save(lostItem);

	}

	@GetMapping("/lost")
	public List<LostItem> getAllLostItems() {
		// TODO Auto-generated method stub
		return lostItemDao.getAllLostItems();
	}

	@GetMapping("/lost/{lostItemId}")
	public LostItem getLostItemById(@PathVariable String lostItemId) {
		// TODO Auto-generated method stub
		return lostItemDao.getLostItemById(lostItemId);
	}

	@DeleteMapping("/lost/{lostItemId}")
	public void deleteLostItemById(String lostItemId) {
		// TODO Auto-generated method stub
		lostItemDao.deleteLostItemById(lostItemId);

	}

	@GetMapping("/lost-id")
	public String generateLostItemId() {
		// TODO Auto-generated method stub
		//service class will generate the id
		return lostService.generateLostItemId();
	}
	

	  @PutMapping("/lost")
	    public void updateLostItem(@PathVariable String lostItemId,
	                               @RequestBody LostItem lostItem) {
	        
	        lostItemDao.saveLostItem(lostItem);
	    }

	@GetMapping("/lost-user") 
	public List<LostItem> getLostItemsByUsername() {
		// TODO Auto-generated method stub
		String userId = service.getUserId();
		return lostItemDao.getLostItemsByUsername(userId);
	}
}
