package edu.infosys.lostFoundLocatorApplication.dao;
import java.util.List;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
public interface MatchItemDao {
	 public void saveMatchItem(MatchItem matchItem);

	    public List<MatchItem> getAllMatchItems();
}
