package com.llibaiv.company.service;

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class,
		webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:data.sql")
public class CompanyServiceIT {

	@LocalServerPort
	private int port;

	TestRestTemplate restTemplate = new TestRestTemplate();
	HttpHeaders headers = new HttpHeaders();

	@Before
	public void before() {
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Test
	public void whenRetrieveCompany_thenOK() throws Exception {
        String expectedBody = getFileResource("DharmaInitiative.json");
		ResponseEntity<String> response = getUrlResource("/companies/1000");
		JSONAssert.assertEquals(expectedBody, response.getBody(), false);
	}

    @Test
    public void whenRetrieveAllCompanies_thenOk() throws Exception {
        String expectedBody = getFileResource("Companies.json");
        ResponseEntity<String> response = getUrlResource("/companies");
        JSONAssert.assertEquals(expectedBody, response.getBody(), false);
    }

	@Test
	public void whenAddCompany_thenOK() throws Exception {
		String wayneIndustries = getFileResource("WayneIndustries.json");
		ResponseEntity<String> response = postToUrlResource("/companies", wayneIndustries);
		String location = getRelativeResourceFromLocation(getLocationFromResponse(response));
		response = getUrlResource(location);
        JSONAssert.assertEquals(wayneIndustries, response.getBody(), false);
	}

    @Test
    public void whenDeleteCompany_thenOK() throws Exception {
        ResponseEntity<String> response = deleteUrlResource("/companies/1000");
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
        response = getUrlResource("/companies/1000");
        Assert.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody().contains("id [1000] not found"));
    }

    @Test
    public void whenUpdateCompany_thenOK() throws Exception {
        String dharmaInitiativeUpdated = getFileResource("DharmaInitiativeUpdated.json");
        ResponseEntity<String> response = putToUrlResource("/companies/1000", dharmaInitiativeUpdated);
        Assert.assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        response = getUrlResource("/companies/1000");
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
        JSONAssert.assertEquals(dharmaInitiativeUpdated, response.getBody(), false);
    }

    @Test
    public void whenAddOwners_thenOK() throws Exception {
        String newOwners = getFileResource("NewOwners.json");
        String dharmaInitiativeWithNewOwners = getFileResource("DharmaInitiativeWithNewOwners.json");
        ResponseEntity<String> response = postToUrlResource("/companies/1000/owners", newOwners);
        Assert.assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        response = getUrlResource("/companies/1000");
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
        JSONAssert.assertEquals(dharmaInitiativeWithNewOwners, response.getBody(), false);
    }

	private String buildFullUrl(String uri) {
		return "http://localhost:" + port + uri;
	}

	private String getFileResource(String resource) throws IOException {
        URL url = Resources.getResource(resource);
        return Resources.toString(url, Charsets.UTF_8);
    }

    private ResponseEntity<String> getUrlResource(String resource) {
        HttpEntity<String> entity = new HttpEntity<>("", headers);
        ResponseEntity<String> response = restTemplate.exchange(
                buildFullUrl(resource),
                HttpMethod.GET, entity, String.class);
        return response;
    }

    private ResponseEntity<String> deleteUrlResource(String resource) {
        HttpEntity<String> entity = new HttpEntity<>("", headers);
        ResponseEntity<String> response = restTemplate.exchange(
                buildFullUrl(resource),
                HttpMethod.DELETE, entity, String.class);
        return response;
    }

    private ResponseEntity<String> postToUrlResource(String url, String body) {
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(
                buildFullUrl(url),
                HttpMethod.POST, entity, String.class);
    }

    private ResponseEntity<String> putToUrlResource(String url, String body) {
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(
                buildFullUrl(url),
                HttpMethod.PUT, entity, String.class);
    }

    private String getRelativeResourceFromLocation(String location) throws Exception {
        URL url = new URL(location);
        return url.getFile();
    }

    private String getLocationFromResponse(ResponseEntity<String> response) {
        return response.getHeaders().get(HttpHeaders.LOCATION).get(0);
    }
}
