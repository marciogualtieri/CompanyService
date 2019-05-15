package com.llibaiv.company.service;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.llibaiv.company.service.entities.Company;
import com.llibaiv.company.service.entities.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:9000")
@RestController
public class CompanyResource {

	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/companies")
	public List<Company> retrieveAllcompanies() {
		return companyRepository.findAll();
	}

	@GetMapping("/companies/{id}")
	public Company retriveCompany(@PathVariable long id) {
		Optional<Company> company = companyRepository.findById(id);

		if (!company.isPresent())
			throw new CompanyNotFoundException("id [" + id + "] not found");

		return company.get();
	}

	@DeleteMapping("/companies/{id}")
	public void deleteCompany(@PathVariable long id) {
		companyRepository.deleteById(id);
	}

	@PostMapping("/companies")
	public ResponseEntity<Object> createCompany(@RequestBody Company company) {
		Company savedCompany = companyRepository.save(company);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedCompany.getId()).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/companies/{id}")
	public ResponseEntity<Object> updatecompany(@RequestBody Company company, @PathVariable long id) {
		Optional<Company> companyOptional = companyRepository.findById(id);

		if (!companyOptional.isPresent())
			return ResponseEntity.notFound().build();

		company.setId(id);
		resetOwnersIds(company);
		companyRepository.save(company);
		return ResponseEntity.noContent().build();
	}

	private void resetOwnersIds(Company company) {
		for (Owner owner: company.getOwners()) {
			owner.setId(null);
		}
	}

    @PostMapping("/companies/{id}/owners")
    public ResponseEntity<Object> addOwners(@RequestBody Set<Owner> owners, @PathVariable long id) {
        Optional<Company> companyOptional = companyRepository.findById(id);

        if (!companyOptional.isPresent())
            return ResponseEntity.notFound().build();
        Company company = companyOptional.get();
        company.getOwners().addAll(owners);
        companyRepository.save(company);
        return ResponseEntity.noContent().build();
    }
}
