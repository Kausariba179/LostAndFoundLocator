package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import edu.infosys.lostFoundLocatorApplication.bean.LostItem;

public interface LostItemDao {
	public void saveLostItem(LostItem lostItem);
	public List<LostItem> getAllLostItems();
	public LostItem getLostItemById(String lostItemId);
	public void deleteLostItemById(String lostItemId);
	public String getLastId();
	public List<LostItem> getLostItemsByUsername(String username);
	public void updateLostItem(LostItem lostItem);
}
