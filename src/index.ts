import { Hono } from 'hono'
import yaml from 'js-yaml'
import { cors } from 'hono/cors'

const app = new Hono()


app.use(cors({
  origin: '*', 
  allowHeaders: ['Content-Type', 'X-Custom-Header'], 
  allowMethods: ['POST', 'GET', 'OPTIONS'], 
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));


app.get('/', (c) => {
  return c.text('This is a free app by AVS')
})

app.post('/ymltojson' , async (c)=>{

  let yml = await c.req.text()

  console.log(yml)

  

  const jsonData = yaml.load(yml) as JSON

  console.log(jsonData)

  return c.json(
   {
    ...jsonData
   }
  )
})

export default app
