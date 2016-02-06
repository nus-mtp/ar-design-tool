using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

public class SaveState : MonoBehaviour {

    private const string SAVE_URL = "./uploadstate.php";
    private const string SAVE_FILE_NAME = "state.dat";
    private const string FIELD_NAME = "binary";
    public ObjectCollection objectCollection;
    public UnityEngine.UI.Text text;
	// Use this for initialization
	void Start () {
	    
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void Save()
    {
        List<GameObject> toSave = objectCollection.GetInSceneObjects();
        string toWrite = "";
        foreach (GameObject g in toSave)
        {
            toWrite = g.name + ",";
        }
        StartCoroutine(PostData(toWrite));

    }

    private IEnumerator PostData(string toWrite)
    {
        WWWForm form = new WWWForm();
        //form.AddField("states", toWrite);
        form.AddBinaryData(FIELD_NAME, SerializeData(),SAVE_FILE_NAME);
        WWW www = new WWW(SAVE_URL,form);
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            print(www.error);
        }
        else
        {
            Debug.Log(www.text);
            www.Dispose();
        }

    }

    private byte[] SerializeData()
    {
        BinaryFormatter bf = new BinaryFormatter();
        State toSerialize = new State(objectCollection.GetInSceneObjects());
        MemoryStream s = new MemoryStream();
        bf.Serialize(s, toSerialize);
        return s.ToArray();
    }

   

    void Awake()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
    }

  
}
