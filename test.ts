import { assertEquals } from "https://deno.land/std@0.111.0/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.111.0/async/delay.ts";
import envhanced from "./envhanced.ts";

Deno.test("read", () => {
  const config = `
    {
        "transport": {
            "net": {
                "port": \${PORT:80},
                "hostname": "\${HOSTNAME:localhost}",
                "password": \${str(PASSWORD)}
            }
        }
    }`;
  Deno.env.set("HOSTNAME", "example.org");
  const parsed = envhanced(config);
  assertEquals(80, parsed.transport.net.port);
  assertEquals("example.org", parsed.transport.net.hostname);
  assertEquals(null, parsed.transport.net.password);
  Deno.env.set("PASSWORD", "foobar");
  const parsed2 = envhanced(config);
  assertEquals(80, parsed2.transport.net.port);
  assertEquals("foobar", parsed2.transport.net.password);
  console.log(JSON.stringify(parsed2));
});
