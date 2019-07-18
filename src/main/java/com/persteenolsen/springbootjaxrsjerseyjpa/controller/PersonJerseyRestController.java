package com.persteenolsen.springbootjaxrsjerseyjpa.controller;

//import java.net.URI;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.persteenolsen.springbootjaxrsjerseyjpa.model.PersonEntity;

import com.persteenolsen.springbootjaxrsjerseyjpa.service.PersonService;

@Component
@Path("/person-jersey")
public class PersonJerseyRestController {

	//private static final Logger logger = LoggerFactory.getLogger(PersonJerseyRestController.class);	
    
    @Autowired
    private PersonService personService;
    
    @GET
	@Path("/persons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllPersons() {
    
        List<PersonEntity> list =  personService.getAll(); 
        
		return Response.ok(list).build();
    }
    
	@GET
	@Path("/person/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPersonById(@PathParam("id") Long id) {
        
        PersonEntity person = personService.getPersonById(id);

        return Response.ok(person).build();
     }
    
     
	@POST
	@Path("/person")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createOrSavePerson( PersonEntity newPerson) {

        PersonEntity person = personService.saveUpdate( newPerson );
        
               if (person == null) {
               // logger.info("Article already exits.");
                  return Response.status(Status.CONFLICT).build();
                }
               return Response.status(Status.CREATED).build();
     }	
    
	    
    @PUT
	@Path("/person/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)	
    public Response updatePerson( PersonEntity newPerson, @PathParam("id") Long id) {
        PersonEntity person = personService.getPersonById(id);

         person.setName(newPerson.getName());
         person.setEmail(newPerson.getEmail());
         person.setAge(newPerson.getAge());

         PersonEntity p = personService.saveUpdate(person);
         
         if (p == null) {
         // logger.info("Article already exits.");
            return Response.status(Status.CONFLICT).build();
         }

      return Response.ok(p).build();
          
   }


	@DELETE
	@Path("/person/{id}")
	@Consumes(MediaType.APPLICATION_JSON)		
	public Response deletePerson(@PathParam("id") Long id) {

        personService.deletePerson(id);
        
		return Response.noContent().build();
	}	
} 