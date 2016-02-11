using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class LoadAssetBundle : MonoBehaviour {

    private string assetBundleName = "./assetbundles/webglbundles.unity3d";
    private string protocol = "http://";
    private string ipAddress = "";
    private string url = "";
    AssetBundle bundle;
    List<GameObject> gameObjects = new List<GameObject>();
    

    public Text downloadStatus;
	// Use this for initialization
    
    private void DownloadAsset(){
       StartCoroutine(Download());
       Debug.Log("download completed");
    }
    
    private IEnumerator Download()
    {
        // Start a download of the given URL

        string randomValue = "?t=" + Random.value;
        url = assetBundleName + randomValue;
        Debug.Log(url);
        WWW www = new WWW(url);
        downloadStatus.text = "Downloading";
        downloadStatus.color = Color.yellow;
        

        // Wait for download to complete
        yield return www;
        if (www.error != null){
            Debug.Log(www.error);
            downloadStatus.text = www.error;
        }
       

        // Load and retrieve the AssetBundle
        bundle = www.assetBundle;
        if (bundle == null)
        {
            downloadStatus.color = Color.red;
            downloadStatus.text = "bundle is null";
        }
        // Load all the objects
        Object[] assetbundlesObject = bundle.LoadAllAssets();
        Debug.Log(assetbundlesObject.Length);
        foreach (Object o in assetbundlesObject)
        {   
            gameObjects.Add((GameObject)o);
        }

        foreach (GameObject g in gameObjects)
        {
            Debug.Log(g);
            Instantiate(g);
        }
        // Unload the AssetBundles compressed contents to conserve memory
        bundle.Unload(false);

        // Frees the memory from the web stream
        www.Dispose();

        downloadStatus.text = "Pass";
        downloadStatus.color = Color.green;
    }

    private void InstantiateAll()
    {
        Debug.Log(gameObjects.Count);
        foreach (GameObject g in gameObjects)
        {
            Debug.Log(g);
            Instantiate(g);
        }

        Debug.Log("completed");

    }

    public void DownloadAndInstantiate()
    {
        DownloadAsset();
        InstantiateAll();
    }

    void Update()
    {
    }
}
