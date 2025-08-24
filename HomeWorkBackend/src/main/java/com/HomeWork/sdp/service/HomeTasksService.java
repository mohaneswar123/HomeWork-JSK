package com.HomeWork.sdp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.HomeWork.sdp.modal.HomeTasks;
import com.HomeWork.sdp.repo.HomeTasksRepo;

@Service
public class HomeTasksService {
	
	
	 private HomeTasksRepo homeTaskRepo;
	 
	// ✅ Constructor injection
    public HomeTasksService(HomeTasksRepo homeTaskRepo) {
        this.homeTaskRepo = homeTaskRepo;
    }

	
	public HomeTasks addTask(HomeTasks task) {
		return homeTaskRepo.save(task);
	}
	public void deleteHomeTask(Long id) {
		if(!homeTaskRepo.existsById(id)) {
			throw new RuntimeException("Task not found");
		}
		homeTaskRepo.deleteById(id);
	}
	public HomeTasks editTask(HomeTasks task) {
		return homeTaskRepo.save(task);
	}
	public List<HomeTasks> getAll(){
		return homeTaskRepo.findAll();
	}
	public HomeTasks getTaskById(Long id) {
		Optional<HomeTasks> task= homeTaskRepo.findById(id);
		return task.orElse(null);
	}
}
