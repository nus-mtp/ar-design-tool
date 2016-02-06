using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class StaticLoad : MonoBehaviour {

    private string url = "http://192.168.1.17/testandroid.unity3d";
    List<GameObject> gameObjects = new List<GameObject>();
    AssetBundle bundle;

    IEnumerator Start()
    {
        // Start a download of the given URL
        Debug.Log(url);
        WWW www = WWW.LoadFromCacheOrDownload(url, 1);

        // Wait for download to complete
        yield return www;
        if (www.error != null)
            Debug.Log(www.error);

        // Load and retrieve the AssetBundle
        bundle = www.assetBundle;
        Debug.Log(bundle);
        // Load all the objects
        Object[] assetbundlesObject = bundle.LoadAllAssets();
        foreach (Object o in assetbundlesObject)
        {
            Debug.Log(o);
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
    }
}
