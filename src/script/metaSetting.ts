export interface iMetaSetting {
    title : string;
    meta : {
        name? : string,
        property? : string,
        content : string,
    }[];
}

export default class MetaSetting {

    private prevTitle : string = '';
    private prevMetaData : {
        content? : string,
        tag : HTMLMetaElement,
    }[] = [];

    constructor( metaList : iMetaSetting ) {

        this.prevTitle = document.title;
        document.title = metaList.title;
        this.prevMetaData = [];

        const metas = document.getElementsByTagName('meta');
        function getTagName( name : string ) {
            for( let i = 0; i < metas.length; i++ ) {
                if( name === metas[i].name ) {
                    return metas[i];
                }
            }
        }

        function getTagProperty( prop : string ) {
            for( let i = 0; i < metas.length; i++ ) {
                if( prop === metas[i].getAttribute('property') ) {
                    return metas[i];
                }
            }
        }
        for( let i = 0; i < metaList.meta.length; i++ ) {
            const metaData = metaList.meta[i];
            if( metaData.name ) {
                let tag = getTagName( metaData.name );
                if( tag ) {
                    this.prevMetaData.push( {
                        content : tag.content,
                        tag
                    } );
                    tag.content = metaData.content;
                }
                else {
                    const tag = document.createElement('meta');
                    tag.name = metaData.name;
                    tag.content = metaData.content;
                    document.head.appendChild( tag );
                    this.prevMetaData.push( {
                        tag
                    } );
                }
            }
            else if( metaData.property ) {
                const tag = getTagProperty( metaData.property );
                if( tag ) {
                    this.prevMetaData.push( {
                        content : tag.content,
                        tag,
                    } );
                    tag.content = metaData.content;
                }
                else {
                    const tag = document.createElement('meta');
                    tag.setAttribute('property', metaData.property);
                    document.head.appendChild( tag );
                    tag.content = metaData.content;
                    this.prevMetaData.push( {
                        tag,
                    } );
                }
            }
        }
    }

    reset() {
        document.title = this.prevTitle;

        for( let i = 0; i < this.prevMetaData.length; i++ ) {
            const tagData: any = this.prevMetaData[i];
            if( tagData.content ) {
                document.head.removeChild( tagData.tag );
            }
            else {

                tagData.tag.content = tagData.content
            }
        }
    }

}
