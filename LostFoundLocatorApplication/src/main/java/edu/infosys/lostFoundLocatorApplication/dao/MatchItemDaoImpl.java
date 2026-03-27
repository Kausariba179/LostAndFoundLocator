package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;

@Service
@Repository
public class MatchItemDaoImpl implements MatchItemDao{
	@Autowired
    private MatchItemRepository repository;

	@Override
	public void saveMatchItem(MatchItem matchItem) {
		// TODO Auto-generated method stub
		 repository.save(matchItem);
	}

	@Override
	public List<MatchItem> getAllMatchItems() {
		// TODO Auto-generated method stub
		//return null;
		 return repository.findAll();
	}

}
