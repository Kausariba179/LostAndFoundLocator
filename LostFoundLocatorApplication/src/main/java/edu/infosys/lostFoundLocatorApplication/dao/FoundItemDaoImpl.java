package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;

@Service
@Repository
public class FoundItemDaoImpl implements FoundItemDao {

    @Autowired
    private FoundItemRepository repository;

    @Override
    public void saveFoundItem(FoundItem foundItem) {
        repository.save(foundItem);
    }

    @Override
    public List<FoundItem> getAllFoundItems() {
        return repository.findAll();
    }

    @Override
    public FoundItem getFoundItemById(String foundItemId) {
        return repository.findById(foundItemId).get();
    }

    @Override
    public void deleteFoundItemById(String foundItemId) {
        repository.deleteById(foundItemId);
    }

    @Override
    public String getLastId() {//get found id 
        return repository.getLastId();
    }

    @Override
    public List<FoundItem> getFoundItemsByUsername(String username) {
        return repository.getFoundItemsByUsername(username);
    }
    @Override
    public String getFoundId() {
    	return repository.getLastId();
    }
   /* @Override
    public void updateFoundItem(FoundItem foundItem) {
        repository.save(foundItem);
    }
    */
    @Override
    public List<FoundItem>searchByKeyword(String keyword){
    	return repository.searchByKeyword(keyword);
    }
    @Override
    public List<FoundItem>fuzzySearchBySoundex(String keyword){
    	return repository.fuzzySearchBySoundex(keyword);
    }
}
