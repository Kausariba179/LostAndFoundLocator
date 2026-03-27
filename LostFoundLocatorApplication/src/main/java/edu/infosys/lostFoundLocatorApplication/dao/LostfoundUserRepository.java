package edu.infosys.lostFoundLocatorApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.lostFoundLocatorApplication.bean.LostfoundUser;

public interface LostfoundUserRepository extends JpaRepository<LostfoundUser, String>{

}
