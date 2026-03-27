package edu.infosys.lostFoundLocatorApplication.controller;

//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.infosys.lostFoundLocatorApplication.bean.LostfoundUser;
import edu.infosys.lostFoundLocatorApplication.config.EncoderConfig;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LoginController {
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private EncoderConfig econfig;
	
	@Autowired
    private AuthenticationManager authenticationManager;
 
	@PostMapping("/login")
	public void registerNewUser(@RequestBody LostfoundUser user) {
		PasswordEncoder bCrypt=econfig.passwordEncoding();
		String encodedPassword=bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.saveUser(user);
	}
	@GetMapping("/login/{userId}/{password}")
	public String validateUser(@PathVariable String userId,@PathVariable String password) {
		String role="false";
		try {
			 Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
		 	    role=service.getRole();
		 	     SecurityContextHolder.getContext().setAuthentication(authentication);
			}catch(Exception ex) {}
		return role;
	}
	
	@GetMapping("/login")
	public LostfoundUser getUserDetails() {
		return service.getUser();
	}
	
	@DeleteMapping("/login/{username}")
	public void deleteUser(@PathVariable String username) {
		service.deleteUser(username);
	}
	
	@GetMapping("/user")
	public String getUserId() {
		return service.getUserId();
	}
	@GetMapping("/role")
	public String getRole() {
		return service.getRole();
	}
	
	@GetMapping("/me")
	public LostfoundUser getUser() {
		return service.getUser();
	}
 
@PostMapping("/logout")
	 public ResponseEntity<String> logout(HttpServletRequest request,
	                                         HttpServletResponse response) {
 
	        // Clear Spring Security Context
	        SecurityContextHolder.clearContext();
 
	        // Invalidate session
	        HttpSession session = request.getSession(false);
	        if (session != null) {
	            session.invalidate();
	        }
 
	        // Delete cookie
	        Cookie cookie = new Cookie("JSESSIONID", null);
	        cookie.setPath("/");
	        cookie.setMaxAge(0);
	        response.addCookie(cookie);
	        return ResponseEntity.ok("Logout successful");
	    }
 
}
