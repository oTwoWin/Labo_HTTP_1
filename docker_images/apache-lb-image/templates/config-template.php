<?php
	$dynamic_app = explode(" ",getenv('DYNAMIC_APP'));
	$static_app = explode(" ",getenv('STATIC_APP'));
?>

<VirtualHost *:80>
	ServerName labo.res.ch

	<Proxy balancer://dynamic>
			<?php
				foreach($dynamic_app as $serv){
					print "BalancerMember http://". $serv ." \n";
				}
			?>
			ProxySet lbmethod=bytraffic
	</Proxy>

	<Proxy balancer://static>
		<?php
			foreach($static_app as $serv){
				print "BalancerMember http://". $serv ."/\n";
			}
		?>
		ProxySet lbmethod=bytraffic
	</Proxy>

	ProxyPass '/api/animals/' 'balancer://dynamic'
	ProxyPassReverse '/api/animals/' 'balancer://dynamic'

	ProxyPass '/' 'balancer://static'
	ProxyPassReverse '/' 'balancer://static'

</VirtualHost>
