import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'universidad-de-guadalajara', 
    api_key: '668766686525284', 
    api_secret: 'r5AF7TcobBfjuoqnlVbQwCGQa4Y',
    secure: true
  });

describe('Tests of fileUpload', () => {
    
    test('should upload a file and bring the url', async() => {
        const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
        const blob = await resp.blob();

        const file = new File([blob],'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length-1].replace('.png', '');
        cloudinary.v2.api.delete_resources(`${imageId}`, {}, ()=>{
            //done();
        })
    });

    test('should bring a error', async() => {

        const file = new File([],'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
    
})
