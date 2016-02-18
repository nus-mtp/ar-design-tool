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
    public void Load()
    {
        StartCoroutine(DownLoadData());
       
    }
    
    private IEnumerator DownLoadData()
    {
        
        WWW www = new WWW(SAVE_DATA_URL);
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
        List<SerialState> states = (List<SerialState>)bf.Deserialize(stream);
        stateManager.InitialzeStates(states);
    }
    
    void Awake()
    {
        stateManager = gameObject.GetComponent<StateManager>();
    }

}
