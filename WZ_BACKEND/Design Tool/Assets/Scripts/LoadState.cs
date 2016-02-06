using UnityEngine;
using System.Collections;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

public class LoadState : MonoBehaviour {

	// Use this for initialization
	private const string SAVE_DATA_URL = "./state.dat";
    private byte[] saveData;
    private ObjectCollection objectCollection;
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
        State state = (State)bf.Deserialize(stream);
        objectCollection.spawnLoadedState(state);
    }
    
    void Awake()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
    }

}
