package edu.infosys.lostFoundLocatorApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.MatchItemDao;

@Service
public class MatchItemService {

    @Autowired
    private MatchItemDao matchItemDao;
    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private FoundItemDao foundItemDao;

    // Save Match Item
    @Transactional
    public void saveMatchItem(MatchItemDTO dto) {

        MatchItem matchItem = new MatchItem(dto);

        // Fetch lost item from DB
        LostItem lostItem = lostItemDao.getLostItemById(dto.getLostItemId());

        matchItemDao.saveMatchItem(matchItem);
        //to get lostuser's username to be displayed in the match list
        matchItem.setLostUsername(lostItem.getUsername());
        //  Delete Lost Item
        lostItemDao.deleteLostItemById(dto.getLostItemId());

        //  Update Found Item Status
        FoundItem foundItem = foundItemDao.getFoundItemById(dto.getFoundItemId());
        foundItem.setStatus(true);
        foundItemDao.saveFoundItem(foundItem);
    }

    // Get All Matches
    public List<MatchItem> getAllMatches() {

        return matchItemDao.getAllMatchItems();
    }

}