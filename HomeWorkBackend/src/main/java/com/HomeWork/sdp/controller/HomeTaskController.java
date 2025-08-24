package com.HomeWork.sdp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.HomeWork.sdp.HomeWorkBackendApplication;
import com.HomeWork.sdp.modal.HomeTasks;
import com.HomeWork.sdp.repo.HomeTasksRepo;
import com.HomeWork.sdp.service.HomeTasksService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class HomeTaskController {

	
	@Autowired
	HomeTasksService homeTaskService;
	@Autowired
	HomeTasksRepo homeTaskRepo;

   
	
	@PostMapping("/add")
	public ResponseEntity<HomeTasks> addTask(@RequestBody HomeTasks task){
		HomeTasks stask= homeTaskService.addTask(task);
		return new ResponseEntity<>(task,HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<HomeTasks> editTask(@RequestBody HomeTasks task){
		HomeTasks curtask=homeTaskService.getTaskById(task.getId());
		if(curtask==null) {
			throw new RuntimeException("task not found");
		}
		return new ResponseEntity<HomeTasks>(curtask,HttpStatus.OK);
	}
	@GetMapping("/get/{id}")
	public ResponseEntity<?> getTaskById(@PathVariable Long id){
		HomeTasks task=homeTaskService.getTaskById(id);
		if(task==null) {
			return new ResponseEntity<String>("task not found",HttpStatus.NOT_FOUND);
		}
		else {
			return new ResponseEntity<HomeTasks>(task,HttpStatus.OK);
		}
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<HomeTasks>> getAll(){
		List<HomeTasks> tasks = homeTaskService.getAll();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTask(@PathVariable Long id){ 
		HomeTasks task=homeTaskService.getTaskById(id);
		if(task==null) {
			return new ResponseEntity<String>("Task not found",HttpStatus.NOT_FOUND);
		}
		else {
			homeTaskService.deleteHomeTask(id);
			return new ResponseEntity<String>("Deleted successfully",HttpStatus.OK);
		}
	}
}
