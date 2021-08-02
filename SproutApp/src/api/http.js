export default  {
      async GET(link){
        console.log('HTTP GET');
        const res = await fetch(link, { method:'GET' })
        const data = await res.json();
        console.log('GET Response');
        console.log(data);
        return data
      },
      async POST(link, params={}){
        console.log('POST: '+ link);
        const res = await
        fetch(link,{
          method:'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        const data = await res.json();
        console.log('POST Response');
        console.log(data);
        return data
      },
      async course(c){
        return this.get(`/db/${c}/index.json`)
      }
}
