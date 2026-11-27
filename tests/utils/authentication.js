import { request } from '@playwright/test';

export const BASE_URL = 'https://staging-app.opensignlabs.com';

export async function apiRequest(method, endpoint, body) {
    const context = await request.newContext({
        baseURL: `${BASE_URL}/api/v1.2/`,
        extraHTTPHeaders: {
//staging testing account
             'x-api-token': 'opensign.kbGBGe9QYYzH1gU4SIXES',
            /*production
            'x-api-token': '',
            */
            /*selfhost.nxglabs.in
            'x-api-token': 'opensign.2NRpUaKQLAftBc8njM6QXJ',
            */
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    //this code it added to handle the createfolder endpoint separately because it is failing in server while executing first create folder api in ths suite
    if (endpoint === 'createfolder') {
        for (let attempt = 1; attempt <= 3; attempt++) {
            const response = await context.fetch(endpoint, {
              method: method.toUpperCase(),
              data: body ? JSON.stringify(body) : undefined
            });
        
            const status = response.status();
            if (status < 500) return await response.json();
        
            console.warn(`⚠️ Attempt ${attempt} failed with status ${status}. Retrying...`);
            await new Promise(res => setTimeout(res, 2000));
          }
        
          throw new Error(`❌ Request to ${endpoint} failed after 3 attempts`);
        }

    //common code to handle all other endpoints
    const response = await context.fetch(endpoint, {
        method: method.toUpperCase(),
        data: body ? JSON.stringify(body) : undefined
    });

    console.log(`✅ ${method.toUpperCase()} ${endpoint} - Status:`, response.status());
    console.log(`✅ Response Headers:`, response.headers());

    const responseText = await response.text();
    console.log(`✅ Raw Response:`, responseText);

    try {
        return JSON.parse(responseText);
    } catch (error) {
        throw new Error(`❌ Failed to parse JSON response.\nRaw Response: ${responseText}`);
    }
}