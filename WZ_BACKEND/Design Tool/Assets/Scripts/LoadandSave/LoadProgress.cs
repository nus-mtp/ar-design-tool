using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

public class LoadProgress : MonoBehaviour {

	// Use this for initialization
	private const string SAVE_DATA_URL = "./state.dat";
    private byte[] saveData;
    private StateManager stateManager;
    private Facade facade;

    public ProjectState projectState; 
  
    public void Load(string url)
    {
        StartCoroutine(DownLoadData(url));
    }

    private IEnumerator DownLoadData(string url)
    {
        //prevent browser caching
        string randomValue = "?random=" + Random.value;
        url +=  randomValue;
        WWW www = new WWW(url);
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            print(www.error);
        }
        else
        {
            saveData = www.bytes;
        }
        www.Dispose();
        BinaryFormatter bf = new BinaryFormatter();
        Stream stream = new MemoryStream(saveData);
        projectState = (ProjectState)bf.Deserialize(stream);
        List<SerialState> states = projectState.serialStates;
        stateManager.InitialzeStates(states);
        facade.SendProjectInfo();
    }
    
    void Awake()
    {
        stateManager = gameObject.GetComponent<StateManager>();
        GameObject facadeGO = GameObject.FindGameObjectWithTag(Facade.FACADE_TAG);
        facade = facadeGO.GetComponent<Facade>();
    }

}
