export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	checkToken: () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			return appsmith.store.access_token		
			}
		
	},	
	autoRefresh:() => {
	setInterval(() => getSolutions.run(), 300000, "autoupdate");
	setInterval(()=> functions.refreshToke(),30000,"refreshToken")
	},
	refreshToke: async () => {
		await sign_in.run().then( async (data) =>{
			
			Object.keys(data).forEach(i => {
					storeValue(i, data[i]);
			});
			console.log(data)
		})
	}
}