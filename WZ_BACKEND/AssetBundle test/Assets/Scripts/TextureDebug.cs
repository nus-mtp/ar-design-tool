using UnityEngine;
using System.Collections;

public class TextureDebug : MonoBehaviour {

	// Use this for initialization
	void Start () {
        Renderer rend = gameObject.GetComponent<Renderer>();
        Debug.Log(rend.material.mainTexture.name);
	}
	
}
