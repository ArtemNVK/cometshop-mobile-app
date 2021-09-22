<p>CometShop Mobile App is a MERN stack ecommerce mobile app with React Native.</p>
<p><strong>NOTE</strong>: CometShop Mobile App is accompanied by CometShop web application. The actual mobile app shares the same backend with aforementioned web application. That is, they are in synch. Although, CometShop Mobile App has no admin panel implemented and uses Stripe for payment processing instead of PayPal that is being used by actual web application (however, both Stripe and PayPal endpoints are defined within the shared backend code).</p>
<p>Web app’s structure:</p>
<ol>
<li><strong>Backend:</strong>
	<ul>
	<li>- <i>Node.js</i> for runtime environment.</li>
	<li>- <i>Express.js</i> for server and API.</li>
	<li>- <i>MongoDB</i> for database.</li>
	<li>- <i>Mongoose.js</i> for interaction with the database.</li> 
	<li>- Authentication:
		<ul>
			<li>- <i> Bcrypt.js</i> for password-hashing.</li>
			<li>- <i> node-jsonwebtoken</i> for token generation.</li>
		</ul>
	</li>
</ul>
</li>
<li><strong>Frontend:</strong>
	<ul>
		<li>- <i>TypeScript</i></li>
		<li>- <i>React Native</i></li>
		<li>- State management:
	<ul>
		<li>- <i>Redux</i>.</li>
		<li>- <i>Redux Thunk</i> for a middleware.</li>
		<li>- <i>React Native Async Storage</i> for storing user data and cart/shipping data.</li>
	</ul>
</li>
	</ul>
</li>
<li><strong>Payments:</strong>
	<ul>
		<li>- <i>Stripe SDK</i> for Stripe services.</li>
	</ul>
</li>
</ol> 
<p>CometShop Mobile App features searching, filtering and sorting.</p>
