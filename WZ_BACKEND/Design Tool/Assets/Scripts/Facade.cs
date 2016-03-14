using UnityEngine;
using System.Collections;

public class Facade : MonoBehaviour {
    LoadAssetBundle loadAssetBundle;
    SaveProgress saveProgress;
    LoadProgress loadProgress;
    GameObject controlScript;
    StateManager stateManager;
    string assetBundleUrl;
    string saveStateURL;
    string loadStateURL;
	
    // Use this for initialization
	void Start () {
       controlScript =  GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
       loadAssetBundle = controlScript.GetComponent<LoadAssetBundle>();
       saveProgress = controlScript.GetComponent<SaveProgress>();
       loadProgress = controlScript.GetComponent<LoadProgress>();
       stateManager = controlScript.GetComponent<StateManager>();
	}

    public void DownloadAssetBundle(string url)
    {
        assetBundleUrl = url;
        loadAssetBundle.DownloadAndInstantiate(url);
    }

    public void LoadProgress(string url)
    {
        loadProgress.Load(url);
    }

    public void SaveProgress(string url)
    {
        saveProgress.Save(url);
    }


    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }
}
