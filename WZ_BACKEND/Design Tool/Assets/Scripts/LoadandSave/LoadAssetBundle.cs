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
    private ModelCreator modelCreator;
    private LoadProgress loadProgress;
    public Text downloadStatus;

    private IEnumerator Download(string url,string stateUrl)
    {
        modelCreator.Init();
        // Start a download of the given URL
        //Random argument added to the back of the URL to prevent caching
        string randomValue = "?t=" + Random.value;
        url += randomValue;
        www = new WWW(url);
        isDownloading = true;
        downloadStatus.color = Color.black;
        
        // Wait for download to complete
        yield return www;
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
            modelCreator.AddGameObjects((GameObject)o);
        }

        modelCreator.PrepareUserObjects();

        // Unload the AssetBundles compressed contents to conserve memory
        bundle.Unload(false);

        // Frees the memory from the web stream
        www.Dispose();
        downloadStatus.color = Color.blue;
        downloadStatus.text = DOWNLOAD_PASS_MESSAGE;
        isDownloading = false;
        loadProgress.Load(stateUrl);
    }

    public void DownloadAndInstantiate(string url, string stateURL)
    {
        StartCoroutine(Download(url,stateURL));
    }

    public void DownloadAssetBundleTest()
    {
        DownloadAndInstantiate(assetBundleName,"./state.dat");
    }

    void Awake()
    {
        modelCreator = gameObject.GetComponent<ModelCreator>();
        loadProgress = gameObject.GetComponent<LoadProgress>();
    }

    void Update()
    {
        if (isDownloading)
        {
            downloadStatus.text = DOWNLOADING_MESSAGE + (int)(www.progress * 100) + "%";
        }
    }
}
