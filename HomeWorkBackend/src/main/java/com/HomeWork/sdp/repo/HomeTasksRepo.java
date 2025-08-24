package com.HomeWork.sdp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HomeWork.sdp.modal.HomeTasks;

@Repository
public interface HomeTasksRepo extends JpaRepository<HomeTasks, Long>{

	HomeTasks findHomeTasksById(Long id);


}
