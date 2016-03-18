using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class LoadAssetBundle : MonoBehaviour
{

    const string assetBundleName = "./assetbundles/webglbundles.unity3d";
    const string protocol = "http://";
    const string CHECK_MESSAGE = "Checking Assets";
    const string DOWNLOADING_MESSAGE = "Downloading Assets:";
    const string DOWNLOAD_FAIL_MESSAGE = "Download has failed, please reload the page";
    const string DOWNLOAD_PASS_MESSAGE = "Assets sucessfully loaded";

    private WWW www;
    private AssetBundle bundle;
    private bool isDownloading = false;
    private ModelCreator objectCollection;

    public Text downloadStatus;

    private IEnumerator Download(string url)
    {
        objectCollection.Init();
        // Start a download of the given URL
        //Random argument added to the back of the URL to prevent caching
        string randomValue = "?t=" + Random.value;
        url += randomValue;
        www = new WWW(url);
        isDownloading = true;
        downloadStatus.color = Color.black;
        
        // Wait for download to complete
        yield return www;
        isDownloading = false;
        if (www.error != null)
        {
            Debug.Log(www.error);
            downloadStatus.text = www.error;
        }

        // Load and retrieve the AssetBundle
        bundle = www.assetBundle;
        if (bundle == null)
        {
            downloadStatus.color = Color.red;
            downloadStatus.text = DOWNLOAD_FAIL_MESSAGE;
        }
        // Load all the objects
        Object[] assetbundlesObject = bundle.LoadAllAssets();

        foreach (Object o in assetbundlesObject)
        {
            objectCollection.AddGameObjects((GameObject)o);
        }

        objectCollection.PrepareUserObjects();

        // Unload the AssetBundles compressed contents to conserve memory
        bundle.Unload(false);

        // Frees the memory from the web stream
        www.Dispose();
        downloadStatus.color = Color.blue;
        downloadStatus.text = DOWNLOAD_PASS_MESSAGE;


    }

    public void DownloadAndInstantiate(string url)
    {
        StartCoroutine(Download(url));
    }

    public void DownloadAssetBundleTest()
    {
        DownloadAndInstantiate(assetBundleName);
    }

    void Awake()
    {
        objectCollection = gameObject.GetComponent<ModelCreator>();
    }

    void Update()
    {
        if (isDownloading)
        {
            downloadStatus.text = DOWNLOADING_MESSAGE + (int)(www.progress * 100) + "%";
        }
    }
}
