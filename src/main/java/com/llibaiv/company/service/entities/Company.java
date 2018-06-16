package com.llibaiv.company.service.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Company {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="company_id")
	private Long id;
	@NotNull
	private String name;
    @NotNull
	private String address;
    @NotNull
	private String city;
    @NotNull
	private String country;
	private String email;
	private String phoneNumber;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="company_id", referencedColumnName="company_id")
    @JsonProperty
    private Set<Owner> owners = new HashSet<>();

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Owner> getOwners() {
        return owners;
    }
    public void setOwners(Set<Owner> owners) {
        this.owners = owners;
    }
}
