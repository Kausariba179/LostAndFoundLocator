package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
@Service
@Repository
public class LostItemDaoImpl implements LostItemDao {
	@Autowired
	private LostItemRepository repository;
	
	@Override
	public void saveLostItem(LostItem lostItem) {
		// Insert statement for saving the lost item
		repository.save(lostItem);

	}

	@Override
	public List<LostItem> getAllLostItems() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public LostItem getLostItemById(String lostItemId) {
		// TODO Auto-generated method stub
		return repository.findById(lostItemId).get();
	}

	@Override
	public void deleteLostItemById(String lostItemId) {
		// TODO Auto-generated method stub
		repository.deleteById(lostItemId);

	}

	@Override
	public String getLastId() {
		// TODO Auto-generated method stub
		return repository.getLastId();
	}

	@Override
	public List<LostItem> getLostItemsByUsername(String username) {
		// TODO Auto-generated method stub
		return repository.getLostItemsByUsername(username);
	}
	@Override
	public void updateLostItem(LostItem lostItem) {
	    repository.save(lostItem);
	}//public void updateLostItem(LostItem lostItem);
}
