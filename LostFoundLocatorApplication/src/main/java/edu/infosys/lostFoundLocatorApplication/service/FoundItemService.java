package edu.infosys.lostFoundLocatorApplication.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.bean.FoundItemDTO;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
//import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;

@Service
public class FoundItemService {
	@Autowired
	  private FoundItemDao foundItemDao;
	
	public String generateFoundItemId() {
		String newId="";
		String id=foundItemDao.getFoundId();
		//String id=foundItemDao.getLastId();
		if(id==null) {
			newId="F100001";
		}else {
			int num=Integer.parseInt(id.substring(1))+1;
			newId="F"+num;
		}
		return newId;
	}
	//combined smart search (like + soundx)
	private List<FoundItemDTO> smartSearch(String keyword){
	
	   List<FoundItem> keywordResults= foundItemDao.searchByKeyword(keyword);
       List<FoundItem> soundexResults = foundItemDao.fuzzySearchBySoundex(keyword);
	// merge both lists
	Map<String, FoundItemDTO> merged= new LinkedHashMap<String, FoundItemDTO>();
	keywordResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));
	soundexResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));
	return new ArrayList<FoundItemDTO>(merged.values());
	}
	
	public List<FoundItemDTO> collectFoundItems(LostItem lostItem){
		TreeSet<FoundItemDTO> itemSet = new TreeSet<FoundItemDTO>();
		itemSet.addAll(smartSearch(lostItem.getLostItemName()));
		itemSet.addAll(smartSearch(lostItem.getCategory()));
		itemSet.addAll(smartSearch(lostItem.getColor()));
		return new ArrayList<FoundItemDTO>(itemSet);
	}
}
