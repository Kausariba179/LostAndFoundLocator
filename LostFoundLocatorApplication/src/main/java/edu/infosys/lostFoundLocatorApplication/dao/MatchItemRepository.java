package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {



    // Get all matches created for a particular user
    //@Query("SELECT m FROM MatchItem m WHERE m.username=?1")
    //public List<MatchItem> getMatchesByUsername(String username);

    // Get matches by lost item id
   // @Query("SELECT m FROM MatchItem m WHERE m.lostItemId=?1")
   // public List<MatchItem> getMatchesByLostItemId(String lostItemId);

    // Get matches by found item id
   // @Query("SELECT m FROM MatchItem m WHERE m.foundItemId=?1")
   // public List<MatchItem> getMatchesByFoundItemId(String foundItemId);
}
