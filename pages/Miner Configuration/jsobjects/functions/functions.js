export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	checkToken: () => {
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			// console.log(appsmith.store.expires_at)
			
			return appsmith.store.access_token		
			}
	},	
	autoRefresh: async () => {
	setInterval(async ()=> await functions.checkToken(),360000,"checkToken")
	setInterval(async () => await functions.getScore(),60000,"getScore")
	setInterval(async ()=> await functions.refreshToke(),60000,"refreshToken")
	// setInterval(async ()=> await functions.refreshToke(),60000, "reloadPage")
	setInterval(async ()=> await functions.getTickOverview(),60000,"getTickOverview")
	setInterval(async ()=> await functions.get_total_sol(),60000, "get_total_sol")
	setInterval(async ()=> await inActiveMiner.run(),60000,"get_inactive_miner")
	setInterval(async ()=> await activeMiner.run().run(),60000,"get_inactive_miner")
	
	},
	refreshToke: async () => {
		await sign_in.run().then( data =>{
			
			Object.keys(data).forEach(i => {
					storeValue(i, data[i]);
			});
			// console.log(appsmith.store.access_token)
		})
	},
	get_total_sol: async () => {
		// this is get from our own api
		return await getMyEpoch_Solution.run().then(data => {
			storeValue('TotalSolSum',data[0].solutionTotal )
			console.log('d', data[0].solutionTotal)
			return data[0].solutionTotal
		})
		
	},
	getScore: async () => {
		await getScore.run().then(data => {
			if (data) {
				storeValue('score',data[0].score)
			} else {
				storeValue('score'," ")
			}
		})
	},
	getTickOverview: async () => {
		await getTickOverview.run().then( data => {
			storeValue('tickOverview',data)
		})
	},
	isActive: (dateTimeString) => {
  // Parse the provided datetime string
  const providedDateTime = new Date(dateTimeString);
	
  // Get the current datetime
  const currentDateTime = new Date(new Date().toISOString());

  // Calculate the difference in minutes
  const timeDifferenceInMinutes = (currentDateTime - providedDateTime) / (1000 * 60);

  // Compare with 45 minutes
  return Math.abs(timeDifferenceInMinutes) <= 45;
	},
	test: ()=>{
		return (functions.isActive("2024-02-27 01:27:33.186+00"))
	}
}