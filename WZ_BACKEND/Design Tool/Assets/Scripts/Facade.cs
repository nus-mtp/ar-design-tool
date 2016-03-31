using System.Collections.Generic;
using UnityEngine;

public class Facade : MonoBehaviour
{
    public const string FACADE_TAG = "Facade";
    public const string JAVASCRIPT_PREFIX = "globalFunc.";
    private string assetBundleUrl;
    private GameObject controlScript;
    private LoadAssetBundle loadAssetBundle;
    private LoadProgress loadProgress;
    private string loadStateURL;
    private ModelCreator objectCollection;
    private SaveProgress saveProgress;
    private string saveStateURL;
    private StateManager stateManager;
    private int targetStateId;
    private int targetStateObjectId;
    private TextCreator textCreator;

    public void AddNewState()
    {
        State newState = stateManager.AddNewState();
        //Application.ExternalCall("createState", newState.id, newState.name);
    }

    public void ChangeStateName(string newName)
    {
        stateManager.ChangeStateName(targetStateId, newName);
    }

    public void DeleteGameObject()
    {
        stateManager.DeleteGameObject(targetStateObjectId);
    }

    public void DeleteState()
    {
        stateManager.DeleteState(targetStateId);
    }

    public void DisplayState()
    {
        stateManager.SwitchState(targetStateId);
    }

    public void DownLoadUserStuff(string param)
    {
        string[] arguments = seperate(param);
        string assetBundleUrl = arguments[0];
        string stateUrl = arguments[1];
        loadAssetBundle.DownloadAndInstantiate(assetBundleUrl, stateUrl);
    }


    public void LoadProgress(string url)
    {
        loadProgress.Load(url);
    }

    public void SaveProgress(string url)
    {
        saveProgress.Save(url);
    }

    public void SendProjectInfo()
    {
        string jsonString = stateManager.CreateJavaScriptJson();
        Debug.Log(jsonString);
        Application.ExternalCall("makeProject", jsonString);
    }

    public void SetActiveGameObject()
    {
        stateManager.SetActiveGameObject(targetStateObjectId);
    }
    public void SetTargetState(int id)
    {
        targetStateId = id;
    }

    public void SetTargetStateObject(int id)
    {
        targetStateObjectId = id;
    }

    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }

    public void SetTransitionId(int transitionStateId)
    {
        stateManager.SetTransitionId(targetStateId, targetStateObjectId, transitionStateId);
    }

    public void SpawnObject(int i)
    {
        objectCollection.SpawnObject(i);
    }

    public void SpawnText(string input)
    {
        textCreator.AddNewText(input);
    }

    public void UnSetTransitionId()
    {
        stateManager.UnSetTransitionId(targetStateId, targetStateObjectId);
    }

    private string[] seperate(string s)
    {
        return s.Split(":".ToCharArray());
    }
    // Use this for initialization
    private void Start()
    {
        controlScript = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        loadAssetBundle = controlScript.GetComponent<LoadAssetBundle>();
        objectCollection = controlScript.GetComponent<ModelCreator>();
        saveProgress = controlScript.GetComponent<SaveProgress>();
        loadProgress = controlScript.GetComponent<LoadProgress>();
        stateManager = controlScript.GetComponent<StateManager>();
        textCreator = controlScript.GetComponent<TextCreator>();
        Application.ExternalCall(JAVASCRIPT_PREFIX+"unityHasLoaded");
        #if !UNITY_EDITOR && UNITY_WEBGL
            WebGLInput.captureAllKeyboardInput = false;
        #endif
    }
}