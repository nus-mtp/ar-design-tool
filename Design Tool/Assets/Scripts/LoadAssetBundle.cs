using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class LoadAssetBundle : MonoBehaviour
{

    const string assetBundleName = "./assetbundles/webglbundles.unity3d";
    const string protocol = "http://";
    const string DOWNLOADING_MESSAGE = "Downloading Assets";
    const string DOWNLOAD_FAIL_MESSAGE = "Download has failed, please reload the page";
    const string DOWNLOAD_PASS_MESSAGE = "Assets sucessfully loaded";

    private string url = "";
    private AssetBundle bundle;

    private List<GameObject> gameObjects = new List<GameObject>();
    private ObjectCollection objectCollection;

    public Text downloadStatus;

    private IEnumerator Download()
    {
        // Start a download of the given URL

        string randomValue = "?t=" + Random.value;
        url = assetBundleName + randomValue;
        WWW www = new WWW(url);
        downloadStatus.text = DOWNLOADING_MESSAGE;
        downloadStatus.color = Color.yellow;


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
            downloadStatus.text =DOWNLOAD_FAIL_MESSAGE;
        }
        // Load all the objects
        Object[] assetbundlesObject = bundle.LoadAllAssets();

        foreach (Object o in assetbundlesObject)
        {
            gameObjects.Add((GameObject)o);
        }

        foreach (GameObject g in gameObjects)
        {
            AddMeshCollider(g);
            AttachDragScript(g);
            objectCollection.AddGameObjects(g);

        }


        // Unload the AssetBundles compressed contents to conserve memory
        bundle.Unload(false);

        // Frees the memory from the web stream
        www.Dispose();
        Debug.Log(objectCollection.GetSize());
        downloadStatus.color = Color.blue;
        downloadStatus.text = DOWNLOAD_PASS_MESSAGE;
     

    }

    private void AddMeshCollider(GameObject go)
    {
        MeshFilter[] meshFilters = go.GetComponentsInChildren<MeshFilter>();

        foreach (MeshFilter meshFilter in meshFilters)
        {
            MeshCollider meshCollider = go.AddComponent<MeshCollider>();
            meshCollider.sharedMesh = meshFilter.sharedMesh;
        }
    }

    private void AttachDragScript(GameObject go)
    {
        go.AddComponent<Draggable>();
    }

    public void DownloadAndInstantiate()
    {
        StartCoroutine(Download());
    }

    void Awake()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
    }
}
