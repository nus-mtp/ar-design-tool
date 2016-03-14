using UnityEngine;
using System.Collections;

public class AddKey : MonoBehaviour
{

    void Awake()
    {

        Vuforia.VuforiaBehaviour vscript = gameObject.GetComponent<Vuforia.VuforiaBehaviour>();
        vscript.SetAppLicenseKey("AYSld0D/////AAAAAenUVobQZEoBql4lvG6uPItkxrZDScLKjKm6XNzyezPE2IIhPDa1997"
        +"BTRdCZMRfGHah5uISmkgDiFIp7fZE7qDXZpX5tyyGfuKGpnof1a3FEGThmTmP3+h1OgCJp0r2KDiO/Vce2C5Nc8UCzxDfGq5vMb+eTFMe/X7/"
        +   "hgQx4AwiL+DzNR+Yl3W4N5mx4IpprWLClKskbUXt4QjMf42D/05eVrDhv2GwrujjAXs2+rfJb3+Qj0CdIOiENGMU80YiYA4H90niQ3ivKZRZrqN"
        +"H5p2mMO2cTU84KpGTj72DjX8Sr90eEzgfgl6m74Y2GzNm5rQAqwle1usegzYKAB+nT4IDDAfyUlKzs35pw6353LRD");
        
 
    }

}
