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

	Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
	<Proxy balancer://static>
		<?php
			for($i = 0; $i < count($static_app); ++$i){
				print "BalancerMember http://". $static_app[$i] ."/ route=".$i."\n";
			}
		?>
		ProxySet stickysession=ROUTEID
	</Proxy>

	ProxyPass '/api/animals/' 'balancer://dynamic'
	ProxyPassReverse '/api/animals/' 'balancer://dynamic'

	ProxyPass '/' 'balancer://static'
	ProxyPassReverse '/' 'balancer://static'

</VirtualHost>
