import { renderToString } from 'inferno-server';
import { StaticRouter } from 'inferno-router';
import Koa from 'koa';
import Html from './Html';

const app = new Koa();

app.use(async(ctx, next) => {

  const context = {url: null};
  const content = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <Html>
          <p>hello</p>
      </Html>
    </StaticRouter>
  );
    
  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    return ctx.redirect(context.url)
  }
  
  ctx.body = '<!DOCTYPE html>\n' + content;
  await next();
});
